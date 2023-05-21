package com.longcode.colorRecogniser.models;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@MappedSuperclass
@Getter
@Setter
public class BaseLogModel extends BaseModel {
    @ManyToOne
    @JoinColumn(name = "insertedByUserId")
    private User insertedBy;

    @Column(insertable = false, updatable = false, nullable = false,
            columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private OffsetDateTime insertedAt;

    @ManyToOne
    @JoinColumn(name = "updatedByUserId")
    private User updatedBy;

    @Column(insertable = false, updatable = false, nullable = false,
            columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private OffsetDateTime updatedAt;
}
