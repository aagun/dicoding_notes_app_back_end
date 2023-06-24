const ClientError = require("../../exceptions/ClientException");

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);

      const { title = "untitle", tags, body } = request.payload;
      const noteId = await this._service.addNote({ title, tags, body });
      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      return this.responseExceptionHelper(h, error);
    }
  }

  async getNotesHandler() {
    const notes = await this._service.getNotes();
    return {
      status: "success",
      message: null,
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = await this._service.getNoteById(id);
      return {
        status: "success",
        message: null,
        data: {
          note,
        },
      };
    } catch (error) {
      return this.responseExceptionHelper(h, error);
    }
  }

  async putNoteByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);

      const { id } = request.params;
      const note = await this._service.editNoteById(id, request.payload);
      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
        data: {
          note,
        },
      };
    } catch (error) {
      return this.responseExceptionHelper(h, error);
    }
  }

  async deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = await this._service.deleteNote(id);
      return {
        status: "success",
        message: "Catatan berhasil dihapus",
        data: {
          note,
        },
      };
    } catch (error) {
      return this.responseExceptionHelper(h, error);
    }
  }

  responseExceptionHelper(h, error) {
    if (error instanceof ClientError) {
      return this.clientProcessingErrorHandler(h, error);
    }

    return this.serverProcessingErrorHandler(h, error);
  }

  clientProcessingErrorHandler(h, error) {
    const response = h.response({
      status: "fail",
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }

  serverProcessingErrorHandler(h, error) {
    const response = h.response({
      status: "error",
      message: "Maaf, terjadi kegagalan pada server kami.",
    });

    response.code(500);
    console.error(error);
    return response;
  }
}

module.exports = NotesHandler;
