package com.longcode.colorRecogniser.models.enums;

import com.longcode.colorRecogniser.models.requests.FilterRequest;
import com.longcode.colorRecogniser.utils.SpecificationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.Arrays;

public enum Operator {
    EQUAL {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            Object value = filterRequest.getFieldType().parse(filterRequest.getValue().toString());
            return cb.and(cb.equal(SpecificationUtils.getPath(root, filterRequest.getKey()), value), predicate);
        }
    };
    public abstract <T>Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate);
}
