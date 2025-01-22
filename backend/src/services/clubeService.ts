import { Clube, Titulo } from "../models/index";
import { ClubeInput } from "../types/clubleType";

class ClubeService {
  private clube: typeof Clube;
  private titulo: typeof Titulo;

  constructor(clube: typeof Clube, titulo: typeof Titulo) {
    this.clube = clube;
    this.titulo = titulo;
  }

  async get() {
    try {
      const clubes = await this.clube.findAll({
        include: { association: "titulos" },
      });
      return clubes.map((clube) => {
        return {
          ...clube.dataValues,
          geocode: {
            longitude: clube.dataValues.geocode.coordinates[1],
            latitude: clube.dataValues.geocode.coordinates[0],
          },
        };
      });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getById(id: string) {
    try {
      return await this.clube.findByPk(id, {
        include: { association: "titulos" },
      });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async updateIcon(id: string, iconurl: string) {
    try {
      const club = await this.clube.findByPk(id);
      if (!club) {
        throw new Error(`Club with id ${id} not found`);
      }

      const [_, updatedClub] = await this.clube.update(
        { escudo_url: iconurl },
        { where: { id }, returning: true },
      );

      const titulos = await this.titulo.findAll({
        where: { clubeId: id },
      });

      return {
        ...updatedClub[0].dataValues,
        geocode: {
          longitude: updatedClub[0].dataValues.geocode.coordinates[0],
          latitude: updatedClub[0].dataValues.geocode.coordinates[1],
        },
        titulos,
      };
    } catch (error) {
      throw new Error(`Failed to update icon: ${error.message}`);
    }
  }

  async create(data: ClubeInput) {
    try {
      const club = { ...data, titulos: undefined };

      const { dataValues } = await this.clube.create({
        ...club,
        geocode: {
          type: "Point",
          coordinates: [club.geocode.longitude, club.geocode.latitude],
        },
      });

      dataValues.geocode = {
        longitude: dataValues.geocode.coordinates[0],
        latitude: dataValues.geocode.coordinates[1],
      };

      let { titulos } = data;

      const modified = titulos.map((titulo) => {
        return {
          ...titulo,
          clubeId: dataValues.id,
        };
      });

      await this.titulo.destroy({
        where: {
          clubeId: dataValues.id,
        },
      });
      const resultTitulos = await this.titulo.bulkCreate(modified);

      return {
        ...dataValues,
        titulos: resultTitulos,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async update(id: string, data: ClubeInput) {
    try {
      const clube = await this.clube.findByPk(id);

      if (!clube) {
        throw new Error("Clube não encontrado");
      }

      const modified = data.titulos.map((titulo) => {
        return {
          ...titulo,
          clubeId: id,
        };
      });

      const club = { ...data, titulos: undefined };

      const { dataValues } = await clube.update({
        ...club,
        geocode: {
          type: "Point",
          coordinates: [club.geocode.longitude, club.geocode.latitude],
        },
      });

      await this.titulo.destroy({
        where: {
          clubeId: id,
        },
      });
      const resultTitulos = await this.titulo.bulkCreate(modified);

      return {
        ...dataValues,
        geocode: {
          longitude: dataValues.geocode.coordinates[0],
          latitude: dataValues.geocode.coordinates[1],
        },
        titulos: resultTitulos,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async delete(id: string) {
    try {
      const clube = await this.clube.findByPk(id);

      if (!clube) {
        throw new Error("Clube não encontrado");
      }

      await clube.destroy();

      return { message: "Clube deletado com sucesso" };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default ClubeService;
