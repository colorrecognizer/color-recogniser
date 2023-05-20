package com.longcode.colorRecogniser.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.OffsetDateTime;

@MappedSuperclass
@Getter
@Setter
public class BaseLogModel extends BaseModel {
    @ManyToOne
    private User insertedBy;

    @Column(insertable = false, updatable = false, nullable = false,
            columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private OffsetDateTime insertedAt;

    @ManyToOne
    private User updatedBy;

    @Column(insertable = false, updatable = false, nullable = false,
            columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private OffsetDateTime updatedAt;
}
