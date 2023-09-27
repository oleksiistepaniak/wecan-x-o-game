export interface DtoMapper<R, T, M> {
    mapToDto(model: M): R;

    mapToModel(requestDto: T): M;
}