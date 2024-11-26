package ru.gorkycode.ngtu.sportline.business.file.image;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Egor Bokov
 */
@Component
public class ImageMapper {

    public Image map(ImageDto source) {
        Image target = new Image();
        return map(target, source);
    }

    public Image map(Image target, ImageDto source) {
        if(source.getId() != null)
            target.setId(source.getId());

        if(source.getDisplayOrder() != null)
            target.setDisplayOrder(source.getDisplayOrder());

        return target;
    }

    public List<ImageDto> mapReverse(List<Image> source) {
        List<ImageDto> target = new ArrayList<ImageDto>();
        for(Image image : source) {
            target.add(mapReverse(image));
        }
        return target;
    }

    public ImageDto mapReverse(Image source) {
        return ImageDto
                .builder()
                .id(source.getId())
                .displayOrder(source.getDisplayOrder())
                .build();
    }
}
