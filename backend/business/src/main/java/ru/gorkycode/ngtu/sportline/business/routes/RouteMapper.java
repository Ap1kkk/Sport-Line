package ru.gorkycode.ngtu.sportline.business.routes;

import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface RouteMapper {
    Route toEntity(RouteDto routeDto);

    @AfterMapping
    default void linkCheckpoints(@MappingTarget Route route) {
        route.getCheckpoints().forEach(checkpoint -> checkpoint.setRoute(route));
    }

    RouteDto toDto(Route route);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Route partialUpdate(RouteDto routeDto, @MappingTarget Route route);
}