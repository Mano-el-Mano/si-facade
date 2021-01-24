import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import axios from 'axios';
import { LogTypes } from 'src/logTypes';
import { LoggingService } from 'src/logging/logging.service';
@Injectable()
export class ReviewsService {
  private camundaUrl: string;
  private logType: LogTypes;
  constructor(private readonly loggingService: LoggingService) {
    //url to camunda proxy server
    this.logType = LogTypes.CAR_REVIEW;
    this.camundaUrl = 'http://localhost:3001/camunda';
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const url = `${this.camundaUrl}/review`;
    const response = await (await axios.post(url, createReviewDto)).data;
    const timestamp = new Date().toISOString();
    this.loggingService.sendCarRentalLog(
      this.logType,
      createReviewDto.carId,
      timestamp,
    );
    return response;
  }

  async getTasks() {
    const url = `${this.camundaUrl}/tasks`;
    const response = await (await axios.get(url)).data;
    console.log(response);
    return response;
  }

  async completeCreateReviewTask(
    taskId: string,
    createReviewDto: CreateReviewDto,
  ) {
    const url = `${this.camundaUrl}/completeReview/${taskId}`;
    const timestamp = new Date().toISOString();
    this.loggingService.sendCarRentalLog(
      this.logType,
      createReviewDto.carId,
      timestamp,
    );
    const response = await (await axios.post(url, createReviewDto)).data;
    return response;
  }

  async getReviews() {
    const url = `${this.camundaUrl}/review`;
    const response = await (await axios.get(url)).data;
    return response;
  }

  async completeShareTask(taskId: string) {
    const url = `${this.camundaUrl}/completeShare/${taskId}`;
    const response = await (await axios.post(url, {})).data;
    return response;
  }
}
