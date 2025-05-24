import { useEffect, useState } from "react";
import {
  getAllAuthors,
  getAllPublishers,
  postComic,
} from "~/Services/functions";
import type { AuthorDTO, PublisherDTO } from "~/Types/interfaces";

function ComicPost() {
  // Gonna need states for every input. Number inputs come back with string so that's why
  const [comicTitle, setComicTitle] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [sinopsis, setSinopsis] = useState<string>("");
  const [paginas, setPaginas] = useState<string>("");
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");
  const [selectedPublisherId, setSelectedPublisherId] = useState<string>("");
  const [isCollection, setIsCollection] = useState<boolean>(false); //I use this cause if is a collection then Im gonna render the collection number
  const [collectionNumber, setCollectionNumber] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  //States for getting the publishers and authors, in order to dropdown them in the form
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [publishers, setPublishers] = useState<PublisherDTO[]>([]);

  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(""); 
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); 

  // This is letting me charge the authors and publishers every time it reloads
  useEffect(() => {
    const loadPublishersAndAuthors = async () => {
      try {
        const fetchedPublishers = await getAllPublishers();
        setPublishers(fetchedPublishers);
        const authorsPage = await getAllAuthors(0, 1000);
        setAuthors(authorsPage.content);
      } catch (error) {
        console.error("Error al cargar datos de autores o editoriales:", error);
        setMessage("Error al cargar autores o editoriales para el formulario.");
        setIsSuccess(false);
      }
    };
    loadPublishersAndAuthors();
  }, []);

  // To reset the form
  const resetForm = () => {
    setComicTitle("");
    setReleaseDate("");
    setPrice("");
    setStock("");
    setIsbn("");
    setSinopsis("");
    setPaginas("");
    setSelectedAuthorId("");
    setSelectedPublisherId("");
    setIsCollection(false);
    setCollectionNumber("");
    setCoverImageUrl("");
    setErrors({});
    setMessage(""); 
    setIsSuccess(null); 
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    setErrors({});
    setMessage(""); 
    setIsSuccess(null); 
    setIsLoading(true); 

    let newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    // Few validations before sending the form
    if (!comicTitle.trim()) {
      newErrors.comicTitle = "El título del cómic es obligatorio.";
      hasErrors = true;
    }
    if (!releaseDate) {
      newErrors.releaseDate = "La fecha de lanzamiento es obligatoria.";
      hasErrors = true;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = "El precio debe ser un número válido y mayor que cero.";
      hasErrors = true;
    }
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
      newErrors.stock =
        "El stock debe ser un número entero válido y no negativo.";
      hasErrors = true;
    }
    if (!isbn.trim()) {
      newErrors.ISBN = "El ISBN es obligatorio.";
      hasErrors = true;
    }
    if (!sinopsis.trim()) {
      newErrors.sinopsis = "La sinopsis es obligatoria.";
      hasErrors = true;
    }
    const parsedPaginas = parseInt(paginas, 10);
    if (isNaN(parsedPaginas) || parsedPaginas <= 0) {
      newErrors.paginas =
        "El número de páginas debe ser un número entero válido y mayor que cero.";
      hasErrors = true;
    }
    if (!selectedAuthorId) {
      newErrors.author = "Debes seleccionar un autor.";
      hasErrors = true;
    }
    if (!selectedPublisherId) {
      newErrors.publisher = "Debes seleccionar una editorial.";
      hasErrors = true;
    }
    const parsedCollectionNumber = parseInt(collectionNumber, 10);
    if (
      isCollection &&
      (isNaN(parsedCollectionNumber) || parsedCollectionNumber <= 0)
    ) {
      newErrors.collectionNumber =
        "Si es colección, el número de colección debe ser un número entero válido y mayor que cero.";
      hasErrors = true;
    }
    if (!coverImageUrl.trim()) {
      newErrors.coverUrl = "La URL de la portada es obligatoria.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      setIsLoading(false);
      return; // This is stopping the form to be sent
    }

    try {

      await postComic(
        comicTitle.trim(),
        releaseDate,
        parseFloat(price),
        parseInt(stock, 10),
        isbn.trim(),
        coverImageUrl.trim(),
        sinopsis.trim(),
        parseInt(paginas, 10),
        isCollection,
        isCollection ? parseInt(collectionNumber, 10) : null,
        parseInt(selectedAuthorId, 10),
        parseInt(selectedPublisherId, 10)
      );

      console.log("Petición de cómic enviada con éxito.");
      setMessage("¡Cómic añadido con éxito!"); 
      setIsSuccess(true); 
      resetForm();
    } catch (error) {
      console.error("Error al añadir el cómic desde el componente:", error);
      setMessage(
        `Error al añadir el cómic: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      ); 
      setIsSuccess(false); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center mb-5">¿No lo tenemos? ¡Añádelo!</h2>

        
        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-center ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        

        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-1">
            <label
              htmlFor="comicTitle"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Título del cómic:
            </label>
            <input
              type="text"
              id="comicTitle"
              placeholder="Título del cómic"
              value={comicTitle}
              onChange={(e) => setComicTitle(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.comicTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.comicTitle && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.comicTitle}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="releaseDate"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Fecha de lanzamiento:
            </label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.releaseDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.releaseDate && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.releaseDate}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="price"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Precio:
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.price}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="stock"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Stock:
            </label>
            <input
              type="number"
              step="1"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.stock
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.stock}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="ISBN"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              ISBN:
            </label>
            <input
              type="text"
              id="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.ISBN
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.ISBN && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.ISBN}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="coverUrl"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              URL de Portada:
            </label>
            <input
              type="url"
              id="coverUrl"
              placeholder="https://ejemplo.com/portada.jpg"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.coverUrl
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.coverUrl && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.coverUrl}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="sinopsis"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Sinopsis:
            </label>
            <textarea
              id="sinopsis"
              rows={4}
              placeholder="Sinopsis del cómic"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 resize-y ${
                errors.sinopsis
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.sinopsis && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.sinopsis}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="paginas"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Número de páginas:
            </label>
            <input
              type="number"
              step="1"
              id="paginas"
              value={paginas}
              onChange={(e) => setPaginas(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.paginas
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            />
          </div>
          {errors.paginas && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.paginas}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="author"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Autor:
            </label>
            <select
              id="author"
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 bg-white ${
                errors.author
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            >
              <option value="">Selecciona un autor</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name} {author.lastName}
                </option>
              ))}
            </select>
          </div>
          {errors.author && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.author}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-1">
            <label
              htmlFor="publisher"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              Editorial:
            </label>
            <select
              id="publisher"
              value={selectedPublisherId}
              onChange={(e) => setSelectedPublisherId(e.target.value)}
              className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 bg-white ${
                errors.publisher
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-cyan-500"
              }`}
            >
              <option value="">Selecciona una editorial</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>
          {errors.publisher && (
            <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
              {errors.publisher}
            </p>
          )}
          <div className="mb-4" />

          <div className="flex items-center mb-4">
            <label
              htmlFor="isCollection"
              className="w-1/3 text-right pr-4 font-semibold"
            >
              ¿Es colección?
            </label>
            <input
              type="checkbox"
              id="isCollection"
              checked={isCollection}
              onChange={(e) => setIsCollection(e.target.checked)}
              className="h-5 w-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
            />
          </div>

          {isCollection && (
            <>
              <div className="flex items-center mb-1">
                <label
                  htmlFor="collectionNumber"
                  className="w-1/3 text-right pr-4 font-semibold"
                >
                  Número de colección:
                </label>
                <input
                  type="number"
                  step="1"
                  id="collectionNumber"
                  value={collectionNumber}
                  onChange={(e) => setCollectionNumber(e.target.value)}
                  className={`w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.collectionNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-cyan-500"
                  }`}
                />
              </div>
              {errors.collectionNumber && (
                <p className="text-red-500 text-sm mt-1 text-right w-2/3 ml-auto pr-4">
                  {errors.collectionNumber}
                </p>
              )}
              <div className="mb-4" />
            </>
          )}

          <button
            type="submit"
            className="bg-cyan-500 text-white p-3 rounded-md w-full mt-6 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Añadiendo Cómic..." : "Añadir Cómic"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComicPost;
