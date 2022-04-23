# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]

  def landing
    @todos = Todo.all.order(:id)
  end

  def edit_todo_item
    @todo_item.update(todo_item_params)
    render json: @todo_item
  end

  def reset_todo_items
    Todo.update_all(checked: false)
    @todos = Todo.all.order(:id)
    render json: @todos
  end

  private

  def todo_item_params
    params.require(:home).permit(:id, :title, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(params[:id])
  end
end
