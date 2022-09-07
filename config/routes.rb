# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "todos#index"

  resources :todos, only: [:index, :update] do
    post "reset", to: "todos#reset", on: :collection
  end
end
