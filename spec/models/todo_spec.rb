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
RSpec.describe(::Todo, type: :model) do
  it { is_expected.to(have_one_attached(:file)) }
  it { is_expected.to(validate_presence_of(:title)) }
end
