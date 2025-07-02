import ApiService from "@/core/services/ApiService";
import { generateQueryParams } from "@/modules/shared/utilities/QueryParamsGenerator";
import { showErrorNotification } from "@/modules/shared/utilities/ShowErrorNotification";
import type { BaseListResponse, BaseModel, BaseResponse } from "../interfaces/generic";

/**
 * Clase para manejar operaciones de API genéricas
 */
export class GenericApiService<T extends BaseModel> {
  constructor(private readonly endpoint: string) {}

  /**
   * Obtiene una lista paginada de elementos
   */
  async getList(
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    searchBy: string,
    fields: string
  ): Promise<BaseListResponse<T>> {
    try {
      const params = generateQueryParams({
        "page[size]": pageSize,
        "page[number]": pageNumber,
        [`fields[${this.endpoint}]`]: fields,
        sort: sortBy,
        ...(searchBy && { "filter[search]": searchBy }),
      });

      const { data } = await ApiService.vueInstance.axios.get<BaseListResponse<T>>(
        this.endpoint,
        { params }
      );

      return data;
    } catch (error) {
      showErrorNotification(`An error occurred while fetching ${this.endpoint}.`);
      throw error;
    }
  }

  /**
   * Obtiene un elemento por ID
   */
  async getById(id: number): Promise<BaseResponse<T>> {
    const { data } = await ApiService.vueInstance.axios.get<BaseResponse<T>>(
      `${this.endpoint}/${id}`
    );
    return data;
  }

  /**
   * Crea un nuevo elemento
   */
  async create(item: T): Promise<BaseResponse<T>> {
    const { data } = await ApiService.vueInstance.axios.post<BaseResponse<T>>(
      `/${this.endpoint}`,
      {
        data: {
          type: this.endpoint,
          attributes: item.attributes,
        },
      }
    );
    return data;
  }

  /**
   * Actualiza un elemento existente
   */
  async update(item: T): Promise<BaseResponse<T>> {
    const { data } = await ApiService.vueInstance.axios.patch<BaseResponse<T>>(
      `/${this.endpoint}/${item.id}`,
      {
        data: {
          type: this.endpoint,
          id: item.id,
          attributes: item.attributes,
        },
      }
    );
    return data;
  }

  /**
   * Elimina un elemento
   */
  async delete(id: number): Promise<void> {
    await ApiService.vueInstance.axios.delete(`/${this.endpoint}/${id}`);
  }

  /**
   * Sube archivos para un elemento
   */
  async uploadFiles(itemId: number, files: any[], collection: string = "images"): Promise<any> {
    const formData = new FormData();
    formData.append("id", itemId.toString());
    formData.append("path", this.endpoint);
    formData.append("collection", collection);

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file.raw);
    });

    const { data } = await ApiService.vueInstance.axios.post(
      `/${this.endpoint}/upload-files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }
}