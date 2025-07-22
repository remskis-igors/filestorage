package com.s3portal.fileStorage.repository;

import com.s3portal.fileStorage.model.StoredFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileMetadataRepository extends JpaRepository<StoredFile, Long> {}