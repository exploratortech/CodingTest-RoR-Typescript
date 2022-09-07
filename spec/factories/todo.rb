# frozen_string_literal: true

FactoryBot.define do
  factory :todo, class: Todo do
    sequence(:title) { |n| "New Todo #{n}" }
    checked { false }
  end
end
