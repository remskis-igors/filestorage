package com.s3portal.fileStorage.service;

import com.s3portal.fileStorage.model.StoredFile;
import com.s3portal.fileStorage.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final S3Client s3Client;
    private final FileMetadataRepository fileRepository;

    private final String BUCKET_NAME = "bucketName";

    public StoredFile uploadFile(MultipartFile file) throws IOException {
        String key = file.getOriginalFilename();

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putRequest, software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes()));

        String s3Url = String.format("https://%s.s3.amazonaws.com/%s", BUCKET_NAME, key);

        StoredFile stored = new StoredFile(null, key, s3Url, file.getContentType());
        return fileRepository.save(stored);
    }
}
