# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

menus = Menu.create(
  [
    { name: 'Menu 1', position: 1 },
    { name: 'Menu 2', position: 2 },
    { name: 'Menu 3', position: 3 }
  ]
)

SubMenu.create(
  [
    { name: 'SubMenu 1', menu: menus.first, position: 1 },
    { name: 'SubMenu 2', menu: menus.first, position: 2 },
    { name: 'SubMenu 3', menu: menus.first, position: 3 },
    { name: 'SubMenu 4', menu: menus.first, position: 4 },
    { name: 'SubMenu 5', menu: menus.second, position: 1 },
    { name: 'SubMenu 6', menu: menus.second, position: 2 },
    { name: 'SubMenu 7', menu: menus.second, position: 3 },
    { name: 'SubMenu 8', menu: menus.second, position: 4 }
  ]
)
