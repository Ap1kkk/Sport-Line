package ru.gorkycode.ngtu.sportline.business.routes.mappers;

import org.mapstruct.*;
import ru.gorkycode.ngtu.sportline.business.routes.dto.RouteDto;
import ru.gorkycode.ngtu.sportline.business.routes.model.Route;

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