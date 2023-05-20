package com.longcode.colorRecogniser.services.modelServices;

import com.longcode.colorRecogniser.models.BaseModel;
import com.longcode.colorRecogniser.models.requests.SearchRequest;
import com.longcode.colorRecogniser.models.shallowModels.SearchSpecification;
import com.longcode.colorRecogniser.repositories.BaseModelRepository;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;

@Getter
@RequiredArgsConstructor
public abstract class BaseModelService<T extends BaseModel> {
    private final BaseModelRepository<T> baseModelRepository;

    // Methods
    public T getById(long id) {
        return baseModelRepository.findById(id).orElse(null);
    }

    public Page<T> search(SearchRequest searchRequest) {
        SearchSpecification<T> specification = new SearchSpecification<>(searchRequest);
        Pageable pageable = SearchSpecification.getPageable(searchRequest.getPage(), searchRequest.getSize());
        return baseModelRepository.findAll(specification, pageable);
    }

    public T insert(@Valid T model) {
        model.setId(null);
        return baseModelRepository.save(model);
    }

    public T update(@Valid T model) {
        if (!baseModelRepository.existsById(model.getId()))
            return null;

        return baseModelRepository.save(model);
    }

    public void deleteById(long id) {
        baseModelRepository.deleteById(id);
    }
}
