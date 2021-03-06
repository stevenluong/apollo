# coding: utf-8
class NewsController < ApplicationController
    before_action :set_news, only: [:show, :edit, :update, :destroy]

    # GET /news
    # GET /news.json
    def index
        if params.has_key?(:date)
            #  @news = News.where(:date=>((Date.today-1).beginning_of_day..Date.today.end_of_day))
            date = Date.strptime(params[:date],"%Y%m%d")
            @news = News.where(:date=>(date.beginning_of_day..date.end_of_day))
        else
            @news = News.where(:date=>(Date.today.beginning_of_day..Date.today.end_of_day)).order(date: :desc)
            #@news = News.where(:date=>(Date.today.beginning_of_day..Date.today.end_of_day))
            #  @news = News.all
        end
        #@news.select(:title,:link,:date,:source,:image_link,:url)
    end

    # GET /news/1
    # GET /news/1.json
    def show
    end

    # GET /news/new
    def new
        @news = News.new
    end

    # GET /news/1/edit
    def edit
    end

    # POST /news
    # POST /news.json
    def create
        news_params[:date]=Date.parse(news_params[:date])
        logger.fatal news_params
        @news = News.new(news_params)
        logger.debug @news.guid
        if News.exists?(:guid => @news.guid)
            #logger.debug "Exists already" 
            render plain: "Exists Already - " + @news.title
        else
            respond_to do |format|
                if @news.save
                    format.html { redirect_to @news, notice: 'News was successfully created.' }
                    format.json { render :show, status: :created, location: @news }
                else
                    format.html { render :new }
                    format.json { render json: @news.errors, status: :unprocessable_entity }
                end
            end
        end
    end

    # PATCH/PUT /news/1
    # PATCH/PUT /news/1.json
    def update
        respond_to do |format|
            if @news.update(news_params)
                format.html { redirect_to @news, notice: 'News was successfully updated.' }
                format.json { render :show, status: :ok, location: @news }
            else
                format.html { render :edit }
                format.json { render json: @news.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /news/1
    # DELETE /news/1.json
    def destroy
        @news.destroy
        respond_to do |format|
            format.html { redirect_to news_index_url, notice: 'News was successfully destroyed.' }
            format.json { head :no_content }
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
        @news = News.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
        params.require(:news).permit(:title, :guid, :link, :date, :source, :image_link, :description)
    end
end
