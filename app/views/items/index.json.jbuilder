json.array!(@items) do |item|
  json.extract! item, :id, :user_id, :item_name, :available, :borrower_id
  json.url item_url(item, format: :json)
end
