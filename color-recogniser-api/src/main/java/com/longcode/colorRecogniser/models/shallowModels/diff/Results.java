package com.longcode.colorRecogniser.models.shallowModels.diff;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Results<T>
{
    private List<Snake<T>> Snakes;
    private List<V> ForwardVs;
    private List<V> ReverseVs;

    public Results(List<Snake<T>> snakes, List<V> forwardVs, List<V> reverseVs)
    {
        this.Snakes = snakes;
        this.ForwardVs = forwardVs;
        this.ReverseVs = reverseVs;
    }

    public Results(List<Snake<T>> snakes, boolean forward, List<V> Vs)
    {
        Snakes = snakes;

        if (forward)
        {
            this.ForwardVs = Vs;
        }
        else
        {
            this.ReverseVs = Vs;
        }
    }
}