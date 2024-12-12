import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MovieService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY');
    this.apiUrl = this.configService.get<string>('TMDB_API_URL');
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<any> {
    try {
      const url = `${this.apiUrl}/discover/movie`;

      const response = await axios.get(url, {
        params: {
          with_genres: genreId,
          page,
          include_adult: false,
          include_video: false,
          language: 'en-US',
          sort_by: 'popularity.desc',
        },
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error en la llamada a TMDb:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        `Error al obtener las películas: ${error.response?.data?.status_message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async searchMoviesByTitle(query: string, page: number = 1): Promise<any> {
    try {
      const url = `${this.apiUrl}/search/movie`;

      const response = await axios.get(url, {
        params: {
          query,
          page,
          include_adult: false,
          language: 'en-US',
        },
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error al buscar películas: ${error.response?.data?.status_message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
