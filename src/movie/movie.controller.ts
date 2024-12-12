import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('genre/:id')
  @ApiOperation({ summary: 'Obtener películas por ID de género' })
  @ApiParam({ name: 'id', description: 'ID del género', type: Number })
  @ApiQuery({ name: 'page', description: 'Número de página', required: false })
  async getMoviesByGenre(
    @Param('id') id: number,
    @Query('page') page?: number,
  ) {
    return await this.movieService.getMoviesByGenre(id, page);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar películas por título' })
  @ApiQuery({
    name: 'query',
    description: 'Título de la película',
    required: true,
  })
  @ApiQuery({ name: 'page', description: 'Número de página', required: false })
  async searchMoviesByTitle(
    @Query('query') query: string,
    @Query('page') page?: number,
  ) {
    return await this.movieService.searchMoviesByTitle(query, page || 1);
  }
}
