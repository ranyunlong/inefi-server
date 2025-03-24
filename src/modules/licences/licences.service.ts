import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { LicenceEntity } from './entities/licence.entity';
import * as moment from 'moment';
import * as forge from 'node-forge';
import { pki } from 'node-forge';
import { v4 } from 'uuid';
import { LicencePageDto } from './dto/licence.page.dto';
import { PageInfo } from '../../interfaces/page-info';
import { instanceToPlain } from 'class-transformer';
import { EdgeEntity } from '../edges/entities/edge.entity';

@Injectable()
export class LicencesService {
  constructor(
    @InjectRepository(LicenceEntity)
    private repository: Repository<LicenceEntity>,
  ) {}

  public save(dto: Partial<LicenceEntity>) {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const cert = forge.pki.createCertificate();
    const date = moment();

    if (!dto.serialNumber) throw new BadRequestException();

    cert.publicKey = keys.publicKey;
    cert.serialNumber = dto.serialNumber;
    cert.validity.notBefore = date.clone().toDate();
    cert.validity.notAfter = date.clone().add(dto.days, 'days').toDate();

    const attrs = [
      {
        name: 'commonName',
        value: 'geckoai.cn',
      },
      {
        name: 'countryName',
        value: 'CN',
      },
      {
        name: 'organizationName',
        value: 'MingQi',
      },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.setExtensions([
      { name: 'basicConstraints', ca: true },
      {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
      {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true,
      },
      {
        name: 'nsCertType',
        client: true,
        server: true,
        email: true,
        objsign: true,
        sslCA: true,
        emailCA: true,
        objCA: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          {
            type: 6, // URI
            value: 'http://www.geckoai.cn/webid#me',
          },
          {
            type: 7, // IP
            ip: '47.116.214.230',
          },
        ],
      },
      {
        name: 'subjectKeyIdentifier',
      },
    ]);
    cert.sign(keys.privateKey);

    return this.repository.save({
      uuid: v4(),
      days: dto.days,
      serialNumber: dto.serialNumber,
      publicPem: pki.publicKeyToPem(keys.publicKey),
      privatePem: pki.privateKeyToPem(keys.privateKey),
      createId: dto.createId,
      x509pem: forge.pki.certificateToPem(cert),
    });
  }

  public async findPage(
    params: LicencePageDto,
  ): Promise<PageInfo<LicenceEntity>> {
    const {
      uuid,
      createAtBegin,
      createAtEnd,
      updateAtEnd,
      updateAtBegin,
      pageSize,
      page,
    } = params;
    const where: FindOptionsWhere<LicenceEntity> = {
      uuid,
    };

    Object.keys(where).forEach((k) => {
      if (where[k] === undefined) {
        delete where[k];
      }
    });

    if (createAtBegin && createAtEnd) {
      where.createAt = Between(createAtBegin, createAtEnd);
    } else if (createAtBegin) {
      where.createAt = MoreThanOrEqual(createAtBegin);
    } else if (createAtEnd) {
      where.createAt = LessThanOrEqual(createAtEnd);
    }

    if (updateAtBegin && updateAtEnd) {
      where.updateAt = Between(updateAtBegin, updateAtEnd);
    } else if (updateAtBegin) {
      where.updateAt = MoreThanOrEqual(updateAtBegin);
    } else if (updateAtEnd) {
      where.updateAt = LessThanOrEqual(updateAtEnd);
    }

    const [list, total] = await this.repository
      .createQueryBuilder()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .where(where)
      .select()
      .getManyAndCount();

    return {
      page: params.page,
      pageSize: params.pageSize,
      total,
      list: instanceToPlain(list) as LicenceEntity[],
    };
  }

  public findOne(where: Partial<EdgeEntity>): Promise<LicenceEntity | null> {
    return this.repository.findOne({ where });
  }

  public findOneByOrFail(where: Partial<EdgeEntity>) {
    return this.repository.findOneByOrFail(where);
  }

  public async validate(where: { uuid: string }) {
    return await this.repository.findOneByOrFail(where);
  }

  public update(uuid: string, dto: Partial<EdgeEntity>) {
    return this.repository.update({ uuid }, dto);
  }

  public async remove(uuid: string) {
    return await this.repository.delete({ uuid });
  }

  public async delete(id: number | number[]) {
    return await this.repository.delete(id);
  }
}
