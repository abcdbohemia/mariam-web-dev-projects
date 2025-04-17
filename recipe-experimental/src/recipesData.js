const initialRecipes = [
    { id: 1, title: "Spaghetti Carbonara", description: "Classic Italian pasta dish.", ingredients:
      ["spaghetti", "eggs", "pancetta", "parmesan", "black pepper"], instructions: [ `In a large frying 
        pan add the oil , pancetta and hot pepper flakes (if using) cook on medium heat until the pancetta 
        is cooked (but not too crispy). Stirring often so the pancetta doesn’t burn.`, `While pancetta is cooking, 
        boil a large pot of water, when the water has boiled add some salt and the pasta and cook until al dente.`, 
        `While pasta is cooking, in a small bowl beat the 3 eggs, then add the parmesan and mix very well.`, `When the 
        pasta is cooked turn the heat back on the pancetta (to medium high), add the drained pasta toss together to combine 
        well for about 20-30 seconds.`, `Remove the pan from the heat add the egg mixture, constantly tossing together, add 
        a tablespoon or two of pasta water to make sure it is very creamy and continue to toss until well blended.`, `Top 
        with parmesan cheese if desired. Serve immediately.`], image: "/images/spaghetti.jpg" },
    { id: 2, title: "Caprese Salad", description: "Simple and refreshing salad.", ingredients: 
      ["tomatoes", "mozzarella", "basil"], instructions: [`Place the tomatoes and mozzarella on a platter.`, 
        `Arrange tomatoes and mozzarella on a platter in an alternating pattern.`, `Top with the basil leaves. Scatter the 
        basil leaves over the tomatoes and mozzarella.`, `Season with flaky salt and black pepper. Sprinkle with a generous 
        pinch of flaky salt and several grinds of black pepper, to taste.`, `Drizzle with the olive oil and balsamic glaze. 
        Drizzle the olive oil and balsamic glaze over the tomatoes, mozzarella, and basil. Serve immediately.`], image: "/images/salad.jpg" },
    { id: 3, title: "Chicken Stir-fry with Vegetables", description: "Quick and easy Asian-inspired dish.", ingredients:
      ["chicken", "broccoli", "carrots", "soy sauce"], instructions: [`Slice the carrots very thin so that they cook quickly.`,
        `This honey garlic chicken stir fry is for garlic lovers, with 4 cloves of garlic in the sauce. If you’re not a big garlic fan, you 
        can cut this amount in half with great results.`, `I recommend using low sodium chicken broth to help control the salt content of the dish. 
        You can also use low sodium soy sauce if you prefer. Use a tamari sauce to make this recipe gluten free.`, `You can serve this chicken 
        stir fry with pork fried rice, steamed rice, brown rice, quinoa, cauliflower fried rice or sesame noodles.`, `I don’t recommend freezing 
        this honey garlic chicken stir fry as the vegetables tend to soften as they freeze and thaw.`], image: "/images/stir-fry.jpg" },
    {id: 4, title: "Blueberry pancakes", description: "Fluffy pancakes with fresh blueberries.", ingredients: 
      ["flour", "milk", "eggs", "blueberries"], instructions: [`Mix the milk and vinegar and let it sit for a minute or two (you’re making “buttermilk” 
        here).`, `Whisk the dry ingredients together. Whisk the egg, milk, and melted butter into the dry ingredients until just combined.`, `Heat a 
        nonstick pan over medium heat. Melt a little smear of butter in the pan (essential for giving a yummy golden brown crust).`, `Pour about 1/3 cup
         of batter into the hot skillet and spread it flat-like (it will be pretty thick). Arrange a few blueberries on top. Cook until you see little 
         bubbles on top and the edges starting to firm up. Flip and cook for another 1-2 minutes until the pancakes are sky-high fluffy and cooked through.`, 
         `Serve with butter and maple syrup. But honestly, sometimes I just like to eat these plain. YUM, YUM, YUM.`], image: "/images/pancake.jpg" },
    { id: 5, title: "Tomato Soup", description: "Comforting and versatile soup.", ingredients: 
      ["tomatoes", "vegetable broth", "onion", "garlic"], instructions: [`Roast your tomatoes, garlic, and onion. Simply toss everything in olive oil and 
        salt and pepper and roast in the oven for 50 minutes. This release all those juicy, aromatic flavors and give your fresh tomato soup that slow cooked, 
        roasted all day taste.`, `Cook down with broth. Add everything to a large pot with broth to get the right consistency for your soup. I like to cook it 
        down a little with the broth so that the broth really gets infused with all the flavor.`, `Blend up. Use an immersion blender to blend everything up 
        right in the pot, or transfer it to a blender to blend there. Either way, it takes 2 minutes to get a creamy, dreamy tomato soup!`, `Serve. And that’s 
        it! Serve your soup with fresh bread, grilled cheese, or enjoy on its own!`], image: "/images/tomato-soup.jpg" },
    ];

    export default initialRecipes;