# frozen_string_literal: true

# == Schema Information
#
# Table name: todos
#
#  id         :bigint           not null, primary key
#  checked    :boolean          default(FALSE)
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Todo < ApplicationRecord
  has_one_attached :file

  validates :title, presence: true
end
