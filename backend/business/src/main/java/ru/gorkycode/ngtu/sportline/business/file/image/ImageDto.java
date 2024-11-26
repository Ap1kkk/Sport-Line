package ru.gorkycode.ngtu.sportline.business.file.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private UUID id;
    private MultipartFile file;
    private Integer displayOrder;
}
