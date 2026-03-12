Feature: Navegacion de razas de perros

  Scenario: Visualizar la ficha principal de una raza
    Given que el usuario abre la aplicacion
    When selecciona la raza "husky"
    Then deberia ver la ficha informativa principal de esa raza
