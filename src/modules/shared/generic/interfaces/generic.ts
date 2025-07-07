// ==================== INTERFACES BASE ====================

import type { Store } from "pinia";

/**
 * Interfaz base para todos los modelos
 */
export interface BaseModel {
  id: string;
  type: string;
  attributes: Record<string, any>;
  relationships?: Record<string, any>;
}

/**
 * Respuesta de lista genérica
 */
export interface BaseListResponse<T extends BaseModel> {
  data: T[];
  meta: {
    page: {
      currentPage: number;
      perPage: number;
      total: number;
    };
  };
}

/**
 * Respuesta de elemento individual genérico
 */
export interface BaseResponse<T extends BaseModel> {
  data: T;
}

/**
 * Configuración para funcionalidades opcionales
 */
export interface ModelConfig {
  hasFileUpload?: boolean;
  fileUploadCollection?: string;
  messages?: {
    created?: string;
    updated?: string;
    deleted?: string;
    filesSaved?: string;
  };
}

export interface GenericCollectionState<T extends BaseModel> {
  currentPage: number;
  perPage: number;
  sortBy: string;
  searchBy: string;
  total: number;
  items: T[];
}

export interface GenericCollectionActions<T extends BaseModel> {
  setCurrentPage(page: number): void;
  setPerPage(perPage: number): void;
  setSortBy(sortBy: string): void;
  setSearchBy(searchBy: string): void;
  setTotal(total: number): void;
  setItems(items: T[]): void;
}

export type GenericCollectionStore<T extends BaseModel> = Store<
  string,
  GenericCollectionState<T>,
  {},
  GenericCollectionActions<T>
> & GenericCollectionActions<T>;

export type GenericFlatCollectionStore<T extends BaseModel> = Store<
  string,
  { items: T[] },
  {},
  {
    setItems(items: T[]): void;
  }
> & {
  setItems(items: T[]): void;
};

export type GenericItemStore<T extends BaseModel> = Store<
  string,
  { item: T | null },
  {},
  {
    setItem(item: T): void;
    clearItem(): void;
  }
> & {
  setItem(item: T): void;
  clearItem(): void;
};