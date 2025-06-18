<div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-300 shadow-md transform rotate-1">
        <h2 className="text-xl font-bold mb-3 text-gray-800">To do:</h2>
        <ul className="space-y-1">
          {[
            "Land my dream UX job",
            "Drink water",
            "Move to the US",
            "Finish grad school without losing my mind",
            "Print that banner spot by playing",
            "World domination",
            "Get really good at making paste",
            "Travel somewhere new every year"
          ].map((item, index) => (
            <li 
              key={index} 
              className="text-gray-700 hover:text-gray-900 hover:font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
</div>