# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]

  def landing
    @todos = Todo.all.order(:id).map { |record| TodoSerializer.new(record) }
  end

  def edit_todo_item
    @todo_item.image.attach(todo_item_params[:image]) if todo_item_params[:image]
    @todo_item.update(todo_item_params.except(:image))

    render json: @todo_item
  end

  def reset_todo_items
    Todo.update_all(checked: false)
  end

  private

  def todo_item_params
    params.require(:home).permit(:id, :title, :checked, :image)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end
end
