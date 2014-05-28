json.array!(@users) do |user|
  json.extract! user, :id, :email, :password, :facebook_id, :first_name, :last_name
  json.url user_url(user, format: :json)
end
