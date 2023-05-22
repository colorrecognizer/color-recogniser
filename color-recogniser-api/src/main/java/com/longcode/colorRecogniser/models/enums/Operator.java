package com.longcode.colorRecogniser.models.enums;

import com.longcode.colorRecogniser.models.requests.FilterRequest;
import com.longcode.colorRecogniser.utils.SpecificationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.Arrays;

public enum Operator {
    EQUALS {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            Object value = filterRequest.getFieldType().parse(filterRequest.getValue().toString());
            return cb.and(cb.equal(SpecificationUtils.getPath(root, filterRequest.getKey()), value), predicate);
        }
    },
    NOT_EQUALS {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            Object value = filterRequest.getFieldType().parse(filterRequest.getValue().toString());
            return cb.and(cb.notEqual(SpecificationUtils.getPath(root, filterRequest.getKey()), value), predicate);
        }
    },
    STARTS_WITH {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            String value = filterRequest.getValue().toString();
            return cb.and(cb.like(cb.lower(SpecificationUtils.getPath((Root<String>) root, filterRequest.getKey())),
                    "%s%%".formatted(value.toLowerCase())), predicate);
        }
    },
    CONTAINS {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            String value = filterRequest.getValue().toString();
            return cb.and(cb.like(cb.lower(SpecificationUtils.getPath((Root<String>) root, filterRequest.getKey())),
                    "%%%s%%".formatted(value.toLowerCase())), predicate);
        }
    },
    NOT_CONTAINS {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            String value = filterRequest.getValue().toString();
            return cb.and(cb.notLike(cb.lower(SpecificationUtils.getPath((Root<String>) root, filterRequest.getKey())),
                    "%%%s%%".formatted(value.toLowerCase())), predicate);
        }
    },
    ENDS_WITH {
        public <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate) {
            String value = filterRequest.getValue().toString();
            return cb.and(cb.like(cb.lower(SpecificationUtils.getPath((Root<String>) root, filterRequest.getKey())),
                    "%%%s".formatted(value.toLowerCase())), predicate);
        }
    },
    ;

    public abstract <T> Predicate build(Root<T> root, CriteriaBuilder cb, FilterRequest filterRequest, Predicate predicate);
}
