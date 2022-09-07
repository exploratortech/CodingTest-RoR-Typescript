# frozen_string_literal: true

RSpec.describe(TodosController) do
  describe 'GET /todos' do
    subject(:http_request) { get :index }

    context 'when no todos exist' do
      it 'returns todos' do
        expect(http_request).to have_http_status(:success)
        expect(assigns[:todos].to_a).to(eq([]))
      end
    end

    context 'when todos exist' do
      let!(:todos) { FactoryBot.create_list(:todo, 2) }

      it 'returns todos' do
        expect(http_request).to have_http_status(:success)
        expect(assigns[:todos].to_a).to(eq(todos))
      end
    end
  end

  describe 'PATCH /todos/:id' do
    subject(:http_request) { patch :update, params: params }
    let(:todo) { FactoryBot.create(:todo) }

    let(:params) { { 'id' => todo.id, 'checked' => true } }

    it 'updates todo' do
      expect(http_request).to have_http_status(:success)
      expect(todo.reload.checked).to(be_truthy)
    end

    context 'when file send' do
      let(:file) { fixture_file_upload('test_file.xml', 'text/xml') }
      let(:params) { { 'id' => todo.id, 'file' => file } }

      it 'attaches file to todo' do
        expect(http_request).to have_http_status(:success)
        expect(todo.reload.file.blob).to(be_present)
      end
    end
  end

  describe 'POST /todos/reset' do
    subject(:http_request) { post :reset }

    let!(:todo1) { FactoryBot.create(:todo, checked: true) }
    let!(:todo2) { FactoryBot.create(:todo, checked: true) }
    let!(:todo3) { FactoryBot.create(:todo, checked: false) }

    it 'unchecked enabled todos' do
      expect(http_request).to have_http_status(:success)

      expect(todo1.reload.checked).to(be_falsey)
      expect(todo2.reload.checked).to(be_falsey)
      expect(todo3.reload.checked).to(be_falsey)
    end
  end
end
