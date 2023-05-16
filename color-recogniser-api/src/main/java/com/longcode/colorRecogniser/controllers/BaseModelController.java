package com.longcode.colorRecogniser.controllers;

import com.longcode.colorRecogniser.models.BaseModel;
import com.longcode.colorRecogniser.models.requests.SearchRequest;
import com.longcode.colorRecogniser.services.BaseModelService;
import com.longcode.colorRecogniser.services.ColorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
public abstract class BaseModelController<T extends BaseModel> {
    private BaseModelService<T> baseModelService;

    @Autowired
    public void setBaseModelService(BaseModelService<T> baseModelService) {
        this.baseModelService = baseModelService;
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<T> findById(@RequestParam long id) {
        return ResponseEntity.ok(baseModelService.findById(id));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<T>> search(@RequestBody @Valid SearchRequest searchRequest) {
        return ResponseEntity.ok(baseModelService.search(searchRequest));
    }

    @PostMapping("/insert")
    public ResponseEntity<T> insert(@RequestBody @Valid T model) {
        return ResponseEntity.ok(baseModelService.insert(model));
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
