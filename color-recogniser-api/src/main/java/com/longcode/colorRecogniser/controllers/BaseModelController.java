package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.config.ApiException;
import com.longcode.colorRecogniser.models.BaseModel;
import com.longcode.colorRecogniser.models.requests.SearchRequest;
import com.longcode.colorRecogniser.services.modelServices.BaseModelService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Getter
public abstract class BaseModelController<T extends BaseModel> {
    private BaseModelService<T> baseModelService;

    @Autowired
    public void setBaseModelService(BaseModelService<T> baseModelService) {
        this.baseModelService = baseModelService;
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<T> getById(@RequestParam long id) {
        return ResponseEntity.ok(baseModelService.getById(id));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<T>> getAll() {
        return ResponseEntity.ok(baseModelService.getAll());
    }

    @PostMapping("/search")
    public ResponseEntity<Page<T>> search(@RequestBody @Valid SearchRequest searchRequest) {
        return ResponseEntity.ok(baseModelService.search(searchRequest));
    }

    @PostMapping("/insert")
    public ResponseEntity<T> insert(@RequestBody @Valid T model) {
        try {
            return ResponseEntity.ok(baseModelService.insert(model));
        } catch (Exception e) {
            throw new ApiException("Data [%s] insertion failed!".formatted(model.toString()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<T> update(@RequestBody @Valid T model) {
        return ResponseEntity.ok(baseModelService.update(model));
    }

    @DeleteMapping("/delete-by-id")
    public void deleteById(@RequestParam long id) {
        baseModelService.deleteById(id);
    }
}
