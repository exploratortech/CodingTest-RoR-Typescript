# frozen_string_literal: true

class AddDefaultItems < ActiveRecord::Migration[6.1]
  def up
    Todo.create(title: "Purpose")
    Todo.create(title: "Peace", checked: true)
    Todo.create(title: "Motivation")
    Todo.create(title: "Health")
  end

  def down
    Todo.destroy_all
  end
end
