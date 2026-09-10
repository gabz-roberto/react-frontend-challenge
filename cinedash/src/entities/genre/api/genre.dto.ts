export interface GenreDto {
  id: number;
  name: string;
}

export interface GenresResponseDto {
  genres: GenreDto[];
}
