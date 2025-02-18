class GhibliFilm
{
    id;
    title;
    original_title;
    original_title_romanised;
    director;
    producer;
    release_date;
    description;
    image;
    movie_banner;

    constructor()
    {}

    setGhibliFilm(ghibliFilmObject)
    {
        let id = ghibliFilmObject.id;
        let title = ghibliFilmObject.title;
        let original_title = ghibliFilmObject.original_title;
        let original_title_romanised = ghibliFilmObject.original_title_romanised;
        let director = ghibliFilmObject.director;
        let producer = ghibliFilmObject.producer;
        let release_date = ghibliFilmObject.release_date;
        let description = ghibliFilmObject.description;
        let image = ghibliFilmObject.image;
        let movie_banner = ghibliFilmObject.movie_banner;

        this.setId(id);
        this.setTitle(title);
        this.setOriginal_title(original_title);
        this.setOriginal_title_romanised(original_title_romanised);
        this.setDirector(director);
        this.setProducer(producer);
        this.setRelease_date(release_date);
        this.setDescription(description);
        this.setImage(image);
        this.setMovie_banner(movie_banner);
    }

    setGhibliFilmValues(id, title, original_title, original_title_romanised, director, producer, release_date, description, image, movie_banner)
    {
        this.setId(id);
        this.setTitle(title);
        this.setOriginal_title(original_title);
        this.setOriginal_title_romanised(original_title_romanised);
        this.setDirector(director);
        this.setProducer(producer);
        this.setRelease_date(release_date);
        this.setDescription(description);
        this.setImage(image);
        this.setMovie_banner(movie_banner);
    }

    setId(id)
    {
        this.id = id;
    }
    setTitle(title)
    {
        this.title = title;
    }
    setOriginal_title(original_title)
    {
        this.original_title = original_title;
    }
    setOriginal_title_romanised(original_title_romanised)
    {
        this.original_title_romanised = original_title_romanised;
    }
    setDirector(director)
    {
        this.director = director;
    }
    setProducer(producer)
    {
        this.producer = producer;
    }
    setRelease_date(release_date)
    {
        this.release_date = release_date;
    }
    setDescription(description)
    {
        this.description = description;
    }
    setImage(image)
    {
        this.image = image;
    }
    setMovie_banner(movie_banner)
    {
        this.movie_banner = movie_banner;
    }

    getId()
    {
        return this.id;
    }
    getTitle()
    {
        return this.title;
    }
    getOriginal_title()
    {
        return this.original_title;
    }
    getOriginal_title_romanised()
    {
        return this.original_title_romanised;
    }
    getDirector()
    {
        return this.director;
    }
    getProducer()
    {
        return this.producer;
    }
    getRelease_date()
    {
        return this.release_date;
    }
    getDescription()
    {
        return this.description;
    }
    getImage()
    {
        return this.image;
    }
    getMovie_banner()
    {
        return this.movie_banner;
    }
}