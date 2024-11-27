package ru.gorkycode.ngtu.sportline.business.user.mappers;

import org.mapstruct.*;
import ru.gorkycode.ngtu.sportline.business.user.dto.UserProjectionDto;
import ru.gorkycode.ngtu.sportline.business.user.model.User;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserProjectionMapper {
    User toEntity(UserProjectionDto userProjectionDto);

    UserProjectionDto toDto(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(UserProjectionDto userProjectionDto, @MappingTarget User user);
}