---
title: Attention is all you need
date: 2023-08-05
tags:
  - Breakdown
---

Few days ago I was trying to how transformers work. I came across this beautiful paper called [Attention is all you need](https://arxiv.org/pdf/1706.03762.pdf). In this post, I'll try to write the simplest possible explanation of the paper.


Okay, here's my attempt!

First, we take a sequence of words and represent it as a grid of numbers: each column of the grid is a separate word, and each row of the grid is a measurement of some property of that word. Words with similar meanings are likely to have similar numerical values on a row-by-row basis.

(During the training process, we create a dictionary of all possible words, with a column of numbers for each of those words. More on this later!)

This grid is called the "context". Typical systems will have a context that spans several thousand columns and several thousand rows. Right now, context length (column count) is rapidly expanding (1k to 2k to 8k to 32k to 100k+!!) while the dimensionality of each word in the dictionary (row count) is pretty static at around 4k to 8k...

Anyhow, the Transformer architecture takes that grid and passes it through a multi-layer transformation algorithm. The functionality of each layer is identical: receive the grid of numbers as input, then perform a mathematical transformation on the grid of numbers, and pass it along to the next layer.

Most systems these days have around 64 or 96 layers.

After the grid of numbers has passed through all the layers, we can use it to generate a new column of numbers that predicts the properties of some word that would maximize the coherence of the sequence if we add it to the end of the grid. We take that new column of numbers and comb through our dictionary to find the actual word that most-closely matches the properties we're looking for.

That word is the winner! We add it to the sequence as a new column, remove the first-column, and run the whole process again! That's how we generate long text-completions on word at a time :D

So the interesting bits are located within that stack of layers. This is why it's called "deep learning".

The mathematical transformation in each layer is called "self-attention", and it involves a lot of matrix multiplications and dot-product calculations with a learned set of "Query, Key and Value" matrixes.

It can be hard to understand what these layers are doing linguistically, but we can use image-processing and computer-vision as a good metaphor, since images are also grids of numbers, and we've all seen how photo-filters can transform that entire grid in lots of useful ways...

You can think of each layer in the transformer as being like a "mask" or "filter" that selects various interesting features from the grid, and then tweaks the image with respect to those masks and filters.

In image processing, you might apply a color-channel mask (chroma key) to select all the green pixels in the background, so that you can erase the background and replace it with other footage. Or you might apply a "gaussian blur" that mixes each pixel with its nearest neighbors, to create a blurring effect. Or you might do the inverse of a gaussian blur, to create a "sharpening" operation that helps you find edges...

But the basic idea is that you have a library of operations that you can apply to a grid of pixels, in order to transform the image (or part of the image) for a desired effect. And you can stack these transforms to create arbitrarily-complex effects.

The same thing is true in a linguistic transformer, where a text sequence is modeled as a matrix.

The language-model has a library of "Query, Key and Value" matrixes (which were learned during training) that are roughly analogous to the "Masks and Filters" we use on images.

Each layer in the Transformer architecture attempts to identify some features of the incoming linguistic data, an then having identified those features, it can subtract those features from the matrix, so that the next layer sees only the transformation, rather than the original.

We don't know exactly what each of these layers is doing in a linguistic model, but we can imagine it's probably doing things like: performing part-of-speech identification (in this context, is the word "ring" a noun or a verb?), reference resolution (who does the word "he" refer to in this sentence?), etc, etc.

And the "dot-product" calculations in each attention layer are there to make each word "entangled" with its neighbors, so that we can discover all the ways that each word is connected to all the other words in its context.

So... that's how we generate word-predictions (aka "inference") at runtime!

By why does it work?

To understand why it's so effective, you have to understand a bit about the training process.

The flow of data during inference always flows in the same direction. It's called a "feed-forward" network.

But during training, there's another step called "back-propagation".

For each document in our training corpus, we go through all the steps I described above, passing each word into our feed-forward neural network and making word-predictions. We start out with a completely randomized set of QKV matrixes, so the results are often really bad!

During training, when we make a prediction, we KNOW what word is supposed to come next. And we have a numerical representation of each word (4096 numbers in a column!) so we can measure the error between our predictions and the actual next word. Those "error" measurements are also represented as columns of 4096 numbers (because we measure the error in every dimension).

So we take that error vector and pass it backward through the whole system! Each layer needs to take the back-propagated error matrix and perform tiny adjustments to its Query, Key, and Value matrixes. Having compensated for those errors, it reverses its calculations based on the new QKV, and passes the resultant matrix backward to the previous layer. So we make tiny corrections on all 96 layers, and eventually to the word-vectors in the dictionary itself!

Like I said earlier, we don't know exactly what those layers are doing. But we know that they're performing a hierarchical decomposition of concepts.

