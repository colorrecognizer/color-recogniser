package com.longcode.colorRecogniser.models.enums;

import com.longcode.colorRecogniser.models.requests.SortRequest;
import com.longcode.colorRecogniser.utils.SpecificationUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Root;

public enum SortDirection {
    ASC {
        public <T> Order build(Root<T> root, CriteriaBuilder cb, SortRequest sortRequest) {
            return cb.asc(SpecificationUtils.getPath(root, sortRequest.getKey()));
        }
    },
    DESC {
        public <T> Order build(Root<T> root, CriteriaBuilder cb, SortRequest sortRequest) {
            return cb.desc(SpecificationUtils.getPath(root, sortRequest.getKey()));
        }
    };

    public abstract <T> Order build(Root<T> root, CriteriaBuilder cb, SortRequest sortRequest);
}
