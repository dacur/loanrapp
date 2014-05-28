class MainController < ApplicationController
  
  def index
  	# @users = User.all
  end
  
  def savefacebookuser
      first_name = params[:first_name]
      last_name = params[:last_name]
      email = params[:email]
      facebook_id = params[:facebook_id]

      # u = User.new(first_name: first_name, last_name: last_name, email: email, facebook_id: facebook_id) 

      # if (u.valid?)
      #   u.save

      u = params[:first_name, :last_name, :email, :facebook_id, :user_id]
      x = User.find_by(facebook_id: facebook_id)
        if x === null{
          x = User.create(first_name: first_name, last_name: last_name, email: email, facebook_id: facebook_id)
        }

          session[:user_id] = u.id.to_s
          session[:first_name] = u.first_name
          session[:last_name] = u.last_name
          # session[:facebook_id] = u.facebook_id

          return x.id.to_s.to_json
        end

        SimpleMailer.welcome_email(u).deliver

      render json: u
    end

    def facebooklogin
      facebook_id = params[:user_id]

      u = User.find_by(facebook_id: facebook_id)

      if (u != nil)
        user_id = u.id.to_s

        session[:user_id] = user_id
        session[:first] = u.first
        session[:last] = u.last
        # session[:facebook_id] = u.facebook_id

        render json: user_id.to_json
      else
        render json: nil
      end
    end

    def logout
    # NON AJAX
    # reset_session
    # flash[:logged_out] = "Y'all come back now ya' here?"
    # redirect_to :root

    # AJAX
      reset_session
      head :ok
    end

end
