package com.karan.backend.util;
//Created By Harikrishnan V
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;


public class CustomCriteriaBuilder<Z> {

	public <X> Predicate createCriteria(CriteriaBuilder builder,SpecSearchCriteria criteria,Root<Z> root,Join<Z, X> joinClasses) {
		if(criteria.getJoinName()!=null) {
			joinClasses = root.join(criteria.getJoinName(), JoinType.LEFT);
			switch (criteria.getOperation()) {
			case EQUALITY:
				return builder.equal(joinClasses.get(criteria.getKey()), criteria.getValue());
			case NEGATION:
				return builder.notEqual(joinClasses.get(criteria.getKey()), criteria.getValue());
			case GREATER_THAN:
				return builder.greaterThan(joinClasses.get(criteria.getKey()), criteria.getValue().toString());
			case LESS_THAN:
				return builder.lessThan(joinClasses.get(criteria.getKey()), criteria.getValue().toString());
			case LIKE:
				return builder.like(joinClasses.get(criteria.getKey()), criteria.getValue().toString());
			case STARTS_WITH:
				return builder.like(joinClasses.get(criteria.getKey()), criteria.getValue() + "%");
			case ENDS_WITH:
				return builder.like(joinClasses.get(criteria.getKey()), "%" + criteria.getValue());
			case CONTAINS:
				return builder.like(joinClasses.get(criteria.getKey()), "%" + criteria.getValue() + "%");
				
			case IN:
				return joinClasses.get(criteria.getKey()).in(criteria.getValue());
			default:
				return null;
			}
		}
		else {
		switch (criteria.getOperation()) {
		case EQUALITY:
			return builder.equal(root.get(criteria.getKey()), criteria.getValue());
		case NEGATION:
			return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
		case GREATER_THAN:
			return builder.greaterThan(root.get(criteria.getKey()), criteria.getValue().toString());
		case LESS_THAN:
			return builder.lessThan(root.get(criteria.getKey()), criteria.getValue().toString());
		case LIKE:
			return builder.like(root.get(criteria.getKey()), criteria.getValue().toString());
		case STARTS_WITH:
			return builder.like(root.get(criteria.getKey()), criteria.getValue() + "%");
		case ENDS_WITH:
			return builder.like(root.get(criteria.getKey()), "%" + criteria.getValue());
		case CONTAINS:
			return builder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
		case IN:
			   return root.get(criteria.getKey()).in(criteria.getArguments());	

		default:
			return null;
		}
		}
	}
}