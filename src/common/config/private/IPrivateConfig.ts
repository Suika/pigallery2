import {ClientConfig} from '../public/ConfigClass';
import {JobScheduleDTO} from '../../entities/job/JobScheduleDTO';

export module ServerConfig {
  export enum DatabaseType {
    memory = 1, mysql = 2, sqlite = 3
  }

  export enum LogLevel {
    error = 1, warn = 2, info = 3, verbose = 4, debug = 5, silly = 6
  }

  export enum SQLLogLevel {
    none = 1, error = 2, all = 3
  }

  export enum PhotoProcessingLib {
    sharp = 3,
    Jimp = 1,
    gm = 2,
  }

  export interface MySQLConfig {
    host: string;
    database: string;
    username: string;
    password: string;
  }

  /*
    export interface SQLiteConfig {
    }

    export interface MemoryConfig {
    }*/

  export interface DataBaseConfig {
    type: DatabaseType;
    dbFolder: string;
    mysql?: MySQLConfig;
    // sqlite?: SQLiteConfig;
    // memory?: MemoryConfig;
  }

  export interface ThumbnailConfig {
    qualityPriority: boolean;
    personFaceMargin: number; // in ration [0-1]
  }

  export interface SharingConfig {
    updateTimeout: number;
  }

  export enum ReIndexingSensitivity {
    low = 1, medium = 2, high = 3
  }

  export interface IndexingConfig {
    folderPreviewSize: number;
    cachedFolderTimeout: number; // Do not rescans the folder if seems ok
    reIndexingSensitivity: ReIndexingSensitivity;
    excludeFolderList: string[];
    excludeFileList: string[];
  }

  export interface ThreadingConfig {
    enabled: boolean;
    thumbnailThreads: number;
  }

  export interface DuplicatesConfig {
    listingLimit: number; // maximum number of duplicates to list
  }

  export interface LogConfig {
    level: LogLevel;
    sqlLevel: SQLLogLevel;
  }

  export interface JobConfig {
    maxSavedProgress: number;
    scheduled: JobScheduleDTO[];
  }

  export type codecType = 'libvpx-vp9' | 'libx264' | 'libvpx' | 'libx265';
  export type resolutionType = 240 | 360 | 480 | 720 | 1080 | 1440 | 2160 | 4320;
  export type formatType = 'mp4' | 'webm';

  export interface VideoConfig {
    transcoding: {
      bitRate: number,
      resolution: resolutionType,
      fps: number,
      codec: codecType,
      format: formatType
    };
  }


  export interface PhotoConfig {
    Converting: {
      onTheFly: boolean;
      resolution: resolutionType
    };
  }

  export interface MediaConfig {
    folder: string;
    tempFolder: string;
    photoProcessingLibrary: PhotoProcessingLib;
    Video: VideoConfig;
    Photo: PhotoConfig;
    Thumbnail: ThumbnailConfig;
  }


  export interface Config {
    sessionSecret: string[];
    port: number;
    host: string;
    Media: MediaConfig;
    Threading: ThreadingConfig;
    Database: DataBaseConfig;
    Sharing: SharingConfig;
    sessionTimeout: number; // in ms
    Indexing: IndexingConfig;
    photoMetadataSize: number; // only this many bites will be loaded when scanning photo for metadata
    Duplicates: DuplicatesConfig;
    Log: LogConfig;
    Jobs: JobConfig;
  }
}

export interface IPrivateConfig {
  Server: ServerConfig.Config;
  Client: ClientConfig.Config;
}
