# frozen_string_literal: true

class TodosController < ApplicationController
  before_action :set_todo_item, only: [:update]

  # GET todos/
  def index
    @todos = Todo.all.order(:id)
  end

  # PATCH todos/:id
  def update
    @todo_item.update(todo_item_params)
  end

  # POST todos/reset
  def reset
    Todo.update(checked: false)
  end

  private

  def todo_item_params
    params.permit(:file, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(params[:id])
  end
end
