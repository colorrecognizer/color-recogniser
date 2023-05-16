package com.longcode.colorRecogniser.models.shallowModels;

import com.longcode.colorRecogniser.models.BaseModel;
import com.longcode.colorRecogniser.models.requests.FilterRequest;
import com.longcode.colorRecogniser.models.requests.SearchRequest;
import com.longcode.colorRecogniser.models.requests.SortRequest;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
public class SearchSpecification <T extends BaseModel> implements Specification<T> {

    private final SearchRequest searchRequest;

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Predicate predicate = cb.equal(cb.literal(Boolean.TRUE), Boolean.TRUE);
        for(FilterRequest filterRequest : searchRequest.getFilters()) {
            predicate = filterRequest.getOperator().build(root, cb, filterRequest, predicate);
        }

        List<Order> orders = new ArrayList<>();
        for(SortRequest sortRequest : searchRequest.getSorts())
            orders.add(sortRequest.getDirection().build(root, cb, sortRequest));

        query.orderBy(orders);
        return predicate;
    }

    public static Pageable getPageable(int page, int size) {
        return PageRequest.of(page, size);
    }
}
