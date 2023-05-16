package com.longcode.colorRecogniser.repositories;

import com.longcode.colorRecogniser.models.BaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface BaseModelRepository<T extends BaseModel> extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {
    List<T> findAllByIdIn(List<Long> ids);
}
