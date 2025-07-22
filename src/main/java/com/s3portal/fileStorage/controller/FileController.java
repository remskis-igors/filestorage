package com.s3portal.fileStorage.controller;

import com.s3portal.fileStorage.model.StoredFile;
import com.s3portal.fileStorage.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@Tag(name = "File API", description = "Endpoints for uploading files to S3 and storing metadata")
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    @Operation(
            summary = "Upload file",
            description = "Uploads a file to Amazon S3 and stores its metadata in the database.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(mediaType = "multipart/form-data")
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "File uploaded successfully",
                            content = @Content(schema = @Schema(implementation = StoredFile.class))
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid input"),
                    @ApiResponse(responseCode = "500", description = "Server error")
            }
    )
    public ResponseEntity<StoredFile> upload(@RequestParam("file") MultipartFile file) throws Exception {
        StoredFile uploaded = fileStorageService.uploadFile(file);
        return ResponseEntity.ok(uploaded);
    }
}
