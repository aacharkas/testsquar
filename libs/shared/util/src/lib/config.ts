import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export class Config {
  static get APP() {
    return {
      environment: process.env.NODE_ENV || 'development',
      url: process.env.APP_URL,
    };
  }

  static get ADOBE() {
    return {
      clientid: process.env.ADOBE_CLIENT_ID,
      clientsecret: process.env.ADOBE_CLIENT_SECRET,
      organizationid: process.env.ADOBE_ORG_ID,
      accountid: process.env.ADOBE_ACCOUNT_ID,
      privatekey: process.env.ADOBE_PRIVATE_KEY,
    };
  }

  static get SENDGRID() {
    return {
      apiKey: process.env.SENDGRID_API_KEY,
    };
  }

  static get JWT() {
    return {
      // Access-RefreshToken / Defaults
      jwtSecret: process.env.JWT_SECRET || 'squaredash jwt secret',
      expiresIn: process.env.JWT_EXPIRES_IN || 60 * 60,
      // Invitation Token
      invitationSecret: process.env.INVITATION_SECRET || 'ce59116024',
      invitationExpiresIn: process.env.INVITATION_EXPIRES_IN || '1d',
      // Confirmation Token
      confirmationSecret: process.env.CONFIRMATION_SECRET || 'f527a7d320',
      confirmationExpiresIn: process.env.CONFIRMATION_EXPIRES_IN || '1d',
      // Reset password Token
      resetPasswordSecret: process.env.RESET_PASSWORD_SECRET || '18d3b45882',
      resetPasswordExpiresIn: process.env.RESET_PASSWORD_EXPIRES_IN || '1d',
    };
  }

  static get DATABASE() {
    return {
      url: process.env.DATABASE_URL,
    };
  }

  static get LOCKOUT_SETTINGS() {
    return {
      observationWindow: Number(process.env.OBSERVATION_WINDOW) || 30 * 60000, // 30 min
      lockoutDuration: Number(process.env.LOCKOUT_DURATION) || 120 * 60000, // 2 h
      lockoutThreshold: Number(process.env.LOCKOUT_THRESHOLD) || 5,
    };
  }

  static get AWS() {
    return {
      region: process.env.AWS_REGION || 'us-east-1',
      publicBucket: process.env.PUBLIC_BUCKET || 'dev-squaredash-public',
      gatewayDomainName: process.env.API_GW_DOMAIN_NAME,
    };
  }

  static get GOOGLE() {
    return {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    };
  }

  static get REDIS() {
    return {
      host:
        process.env.REDIS_HOST ||
        'master.dev-redis-squaredash.jvnkro.use1.cache.amazonaws.com',
    };
  }

  static get WEBSOCKETS() {
    return {
      connectionTtl: process.env.CONNECTION_TTL || 2 * 60 * 60,
    };
  }
}
